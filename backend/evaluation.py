import replicate
import dotenv
import requests


dotenv.load_dotenv(".env")

def gen_image(caption):
    model = replicate.models.get("borisdayma/dalle-mini")
    output = model.predict(prompt=caption, n_predictions=1)
    headers={'user-agent': 'Mozilla/5.0'}
    for link in output:
        return link['image']
        r=requests.get(link['image'], headers=headers)
        with open("static/" + link['image'].split('/')[-1], 'wb') as f:
            f.write(r.content)
