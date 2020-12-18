
import filetype
from os import listdir, rename
from os.path import isfile, join

mypath = r"D:\Libraries\Documents\OHIO\Hack 2020\resumes\uploads"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

prefix = mypath + "\\"
for file in onlyfiles:
    path = prefix + file
    kind = filetype.guess(path)
    if kind is not None:
        print(kind.extension)
        if kind.extension != '.pdf':
            # Reformates file if not pdf
            new = path + '.'+kind.extension
            # .zip tend to end up being .docx
            if kind.extension == 'zip':
                new = path + '.docx'
            rename(path, new)
    else:
        print('kind is none for file: '+path)
