from PIL import Image
import math
import sys

size = [1000,1000]
img = Image.new('RGBA',size)
brightness = [None, 0.01, 0.05, 0.25, 0.5, 0.75, 1, 2]
args = sys.argv

#brightness and constant
# 0 1     2     3     4    5     6  7
# - 0.01, 0.05, 0.25, 0.5, 0.75, 1, 2

# pixAlpha of center pixel => {2~7 => 255, 1=> 230}
# white  2~7 => (255,255,250), 1 => (230,230,225)
# red    2~7 => (246,101,91), 1 => (230,230,225)

sub = 0
if args[1] == "1":
    sub = 25

for x in range(size[0]):
    for y in range(size[1]):
        a = {"x":size[0]/2, "y":size[1]/2}
        b = {"x":x, "y":y}
        pix = (math.sqrt((a['x'] - b['x']) ** 2 + (a['y'] - b['y']) ** 2)-1)
        color = None
        pixAlpha = 255 - sub
        if pix != 0:
            pixAlpha = 255/(math.sqrt((a['x'] - b['x']) ** 2 + (a['y'] - b['y']) ** 2)-1)*brightness[int(args[1])] # <- brightness
        color = (246-sub,101-sub,91-sub,int(pixAlpha))
        img.putpixel((x,y),color)

color = (246-sub,101-sub,91-sub,255-sub)
img.putpixel((int(size[0]/2),int(size[1]/2)),color)

img.show()
img.save("./star-img/"+ args[2]+ ".png")
