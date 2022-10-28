import requests
import pandas as pd

df = pd.read_csv("images.csv")

url = df["link"]

url = list(url)

for i in range(7852, len(url)):
    print(i)
    image_url = str(url[i])
    # print(image_url)
    try:
        r = requests.get(image_url)

        with open(str(i) + ".jpg", "wb") as f:
            f.write(r.content)
    except:
        r = "yo"
        with open(str(i) + "faulty" + ".jpg", "wb") as f:
            f.write(r)

