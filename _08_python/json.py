import json

print(dir(json))
pokemon_dict = {
  "id":1,
  "name": "이상해씨",
  "type": "풀"
}

file_path = "./pokemon_dict.json"

with open(file_path, "w") as f:
    json.dump(pokemon_dict, f)