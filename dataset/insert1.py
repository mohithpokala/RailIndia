import json

text_file = open("stations.json", "r")
data = text_file.read()
text_file.close()
data  = json.loads(data)
station_table = "Station"

print ("-- Adding stations to the database")
for i in range(len(data['features'])):
    if data['features'][i]['geometry'] is None:
        continue
    print("INSERT INTO " + station_table + " VALUES  ('{}', '{}', point({}, {}), '{}', '{}');".format(\
        data['features'][i]['properties']['code'],\
        data['features'][i]['properties']['name'],\
        data['features'][i]['geometry']['coordinates'][0],\
        data['features'][i]['geometry']['coordinates'][1],\
        # zone
        data['features'][i]['properties']['zone'],\
        # address
        data['features'][i]['properties']['address'])\
    )
