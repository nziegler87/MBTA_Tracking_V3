import os

count = 0
while count <= 360:
    if os.path.isfile("./green/base.png"):
        os.rename("./green/base.png", "./red/red_" + str(count) + ".png")
        print("File renamed - " + str(count))
        count += 1
