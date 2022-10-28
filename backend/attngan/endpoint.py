from operator import truediv
from pipeline import PipelineCloud
import nltk
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
from nltk.stem import WordNetLemmatizer  
lemmatizer = WordNetLemmatizer()
from nltk.tokenize import word_tokenize

def gen_image(caption):
    api = PipelineCloud(token="pipeline_sk_o8XEPN6nA2gttTlIPS7IM-6iVasoqyjr")
    run = api.run_pipeline(
    "pipeline_f48996c857e94c1eb22b1c7393e478f2",
    [
        [caption],
        {
            "num_samples": 4
        },
    ],
    )
    obj = run.result_preview[0]
    return obj[0]['samples']

def screen_caption(caption):
    caption = caption.lower()
    screening = ["shalwar", "kameez", "shirt", "t-shirt", "polo", "sweater", "coat"]
    caption_token = [lemmatizer.lemmatize(word) for word in word_tokenize(caption)]
    print(caption_token)

    for token in caption_token:
        if token in screening:
            return True
    
    return False


print(screen_caption("Blue shirts black trouser"))