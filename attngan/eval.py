import torch
import numpy as np
from PIL import Image
import torch.onnx
from datetime import datetime
from torch.autograd import Variable
from miscc.config import cfg, cfg_from_file
from miscc.utils import build_super_images2
from model import RNN_ENCODER, G_NET
import pickle


def vectorize_caption(wordtoix, caption, copies=2):
    # create caption vector
    tokens = caption.split(" ")
    cap_v = []
    for t in tokens:
        t = t.strip().encode("ascii", "ignore").decode("ascii")
        if len(t) > 0 and t in wordtoix:
            cap_v.append(wordtoix[t])

    # expected state for single generation
    captions = np.zeros((copies, len(cap_v)))
    for i in range(copies):
        captions[i, :] = np.array(cap_v)
    cap_lens = np.zeros(copies) + len(cap_v)

    return captions.astype(int), cap_lens.astype(int)


def generate(caption, wordtoix, ixtoword, text_encoder, netG, copies=2):
    captions, cap_lens = vectorize_caption(wordtoix, caption, copies)

    batch_size = captions.shape[0]

    with torch.no_grad():
        captions = Variable(torch.from_numpy(captions), volatile=True).cuda()
        cap_lens = Variable(torch.from_numpy(cap_lens), volatile=True).cuda()
        noise = Variable(
            torch.FloatTensor(batch_size, cfg.GAN.Z_DIM), volatile=True
        ).cuda()

    # Text Embeddings
    hidden = text_encoder.init_hidden(batch_size)
    words_embs, sent_emb = text_encoder(captions, cap_lens, hidden)
    mask = captions == 0

    # Image Generation

    noise.data.normal_(0, 1)
    fake_imgs, attention_maps, _, _ = netG(noise, sent_emb, words_embs, mask)

    cap_lens_np = cap_lens.cpu().data.numpy()

    prefix = datetime.now().strftime("%H_%M_%S_%f")
    image_details = []

    for j in range(batch_size):
        for k in range(len(fake_imgs)):
            im = fake_imgs[k][j].data.cpu().numpy()
            im = (im + 1.0) * 127.5
            im = im.astype(np.uint8)
            im = np.transpose(im, (1, 2, 0))
            im = Image.fromarray(im)

            img_name = "static/%s_%s_g%d.png" % (prefix, "fashion", k)
            print(img_name)
            image_details.append(img_name)
            im.save(img_name, format="png")

            if copies == 2 and k == 2:
                for k in range(len(attention_maps)):
                    if len(fake_imgs) > 1:
                        im = fake_imgs[k + 1].detach().cpu()
                    else:
                        im = fake_imgs[0].detach().cpu()

                    attn_maps = attention_maps[k]
                    att_sze = attn_maps.size(2)

                    img_set, sentences = build_super_images2(
                        im[j].unsqueeze(0),
                        captions[j].unsqueeze(0),
                        [cap_lens_np[j]],
                        ixtoword,
                        [attn_maps[j]],
                        att_sze,
                    )

                    if img_set is not None:
                        im = Image.fromarray(img_set)
                        imgg_name = "static/%s_%s_a%d.png" % (prefix, "attmaps", k)
                        print(imgg_name)
                        image_details.append(imgg_name)
                        im.save(
                            imgg_name, format="png",
                        )
        if copies == 2:
            break
    print(image_details)
    return image_details


def models(word_len):
    # Text Encoder
    text_encoder = RNN_ENCODER(word_len, nhidden=cfg.TEXT.EMBEDDING_DIM)
    state_dict = torch.load(cfg.TRAIN.NET_E, map_location=lambda storage, loc: storage)
    text_encoder.load_state_dict(state_dict)
    if cfg.CUDA:
        text_encoder.cuda()
    text_encoder.eval()

    # GAN
    netG = G_NET()
    state_dict = torch.load(cfg.TRAIN.NET_G, map_location=lambda storage, loc: storage)
    netG.load_state_dict(state_dict)
    if cfg.CUDA:
        netG.cuda()
    netG.eval()

    return text_encoder, netG


def word_index():
    x = pickle.load(open("captions2_attngan.pickle", "rb"))
    ixtoword = x[2]
    wordtoix = x[3]

    return wordtoix, ixtoword


# if __name__ == "__main__":
# caption = "Long sleeve shirt in white and pale grey. Sherpherd's check pattern throughout. Spread button-down collar. Button closure and patch pocket at front. Grosgrain strips at upper sleeve in white. Logo patch at front hem. Tonal stitching. Single-button barrel cuffs with buttoned sleeve placket."
# cfg_from_file("eval_fashiongen.yml")

# wordtoix, ixtoword = word_index()
# text_encoder, netG = models(len(wordtoix))

# generate(caption, wordtoix, ixtoword, text_encoder, netG)
