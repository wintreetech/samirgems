import os 
from PIL import Image 
for name in sorted(os.listdir('src\\assets\\pdf-images')): 
    path = os.path.join('src\\assets\\pdf-images', name) 
    with Image.open(path) as image: 
        print(name, image.size) 
