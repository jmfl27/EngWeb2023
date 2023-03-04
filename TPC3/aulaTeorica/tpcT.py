import json

def acrescentaID():
    f = open('dataset-extra1.json')
    data = json.load(f)

    i = 0
    for p in data["pessoas"]:
        id = 'p' + str(i)
        p["id"] = id
        i += 1

    with open("datasetAlterado.json","w") as out:
        json.dump(data,out)