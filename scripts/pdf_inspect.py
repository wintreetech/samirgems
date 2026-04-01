import fitz 
import json 
doc = fitz.open(r'c:\Users\shubh\OneDrive\Desktop\HOMEPA~1.PDF') 
page = doc[0] 
result = {'fonts': page.get_fonts(full=True), 'image_count': len(page.get_images(full=True))} 
print(json.dumps(result, default=str)) 
