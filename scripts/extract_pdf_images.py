import fitz 
import os 
doc = fitz.open(r'c:\Users\shubh\OneDrive\Desktop\HOMEPA~1.PDF') 
out_dir = 'src\\assets\\pdf-images' 
os.makedirs(out_dir, exist_ok=True) 
for page_index, page in enumerate(doc): 
    for image_index, image in enumerate(page.get_images(full=True)): 
        xref = image[0] 
        pix = fitz.Pixmap(doc, xref) 
        if pix.alpha: 
            pix = fitz.Pixmap(fitz.csRGB, pix) 
        path = os.path.join(out_dir, f'page{page_index + 1}-img{image_index + 1}.png') 
        pix.save(path) 
        print(path) 
