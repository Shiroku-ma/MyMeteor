from PIL import Image
import math

size = [1000,1000]
img = Image.new('RGBA',size)

#brightness and constant
# 0 1     2     3     4    5     6  7  8
# - 0.01, 0.05, 0.25, 0.5, 0.75, 1, 2, 3

for x in range(size[0]):
    for y in range(size[1]):
        a = {"x":size[0]/2, "y":size[1]/2}
        b = {"x":x, "y":y}
        pix = (math.sqrt((a['x'] - b['x']) ** 2 + (a['y'] - b['y']) ** 2)-1)
        if pix != 0:
            pixAlpha = 255/(math.sqrt((a['x'] - b['x']) ** 2 + (a['y'] - b['y']) ** 2)-1)*1 # <- brightness
            #if pixAlpha < 0.94:
            #    pixAlpha=0
            color = (255,255,250,int(pixAlpha))
            #color = (230,230,225,int(pixAlpha))
            img.putpixel((x,y),color)
        else:
            color = (255,255,250,255)
            #color = (230,230,225,230)
            img.putpixel((x,y),color)

color = (255,255,250,255)
#color = (230,230,225,230)
img.putpixel((int(size[0]/2),int(size[1]/2)),color)

img.show()
img.save("./star-img/w_1.png")
