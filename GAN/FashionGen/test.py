import os


for entry in os.scandir("."):
    if entry.is_file():
        print(entry.name)
