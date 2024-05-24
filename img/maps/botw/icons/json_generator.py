import os
for i, filename in enumerate(os.listdir()):
    print(f'{{"type" : "Feature","properties" : {{"name" : "{filename}","type" : "{filename[:-4]}","description": "{filename}"}},"geometry" : {{"type" : "Point","coordinates" : [ {-10}, {0 + i * 22} ]}}}},')