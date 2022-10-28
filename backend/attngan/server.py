from flask import Flask, request, jsonify
from flask_cors import CORS
from eval import *
import random

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "Hello! Welcome to our FYP server. Take a seat and chillllll!~"


@app.route("/fashion", methods=["GET", "POST"])
def get_image():
    caption = request.json["caption"]

    generated_content = generate(caption, wordtoix, ixtoword, text_encoder, netG)

    response = {
        "small": generated_content[0],
        "medium": generated_content[1],
        "large": generated_content[2],
        "map1": generated_content[3],
        "map2": generated_content[4],
        "caption": caption,
    }

    print(f"Got request: {caption}")

    return jsonify({"fashion": response})


if __name__ == "__main__":
    cfg_from_file("eval_fashiongen.yml")

    wordtoix, ixtoword = word_index()
    text_encoder, netG = models(len(wordtoix))

    seed = 100
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if cfg.CUDA:
        torch.cuda.manual_seed_all(seed)

    app.run(debug=False)
