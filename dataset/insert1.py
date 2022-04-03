import json

text_file = open("stations.json", "r")
data = text_file.read()
text_file.close()
data  = json.loads(data)


for i in range(len(data['features'])):
    if data['features'][i]['geometry'] is None:
        continue
    print("INSERT INTO station VALUES ('"+data['features'][i]['properties']['code']+"', '"+str(data['features'][i]['properties']['name'])+"', POINT("+str(data['features'][i]['geometry']['coordinates'][0])+","+str(data['features'][i]['geometry']['coordinates'][1])+"),'"+str(data['features'][i]['properties']['zone'])+"','"+str(data['features'][i]['properties']['state'])+"','"+str(data['features'][i]['properties']['address'])+"');")
