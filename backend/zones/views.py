import json
import os
import time
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

JSON_FILE = 'zones.json'

def load_zones():
    if not os.path.exists(JSON_FILE):
        return []
    with open(JSON_FILE, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_zones(zones):
    with open(JSON_FILE, 'w') as f:
        json.dump(zones, f, indent=4)

@csrf_exempt
def zones_api(request):
    # Delay 5 sec
    time.sleep(5)
    
    if request.method == 'GET':
        zones = load_zones()
        return JsonResponse(zones, safe=False)
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            points = data.get('points')
            if not name or not points or len(points) != 4:
                return HttpResponseBadRequest("Wrong data format")
        except Exception:
            return HttpResponseBadRequest("Wrong JSON format")
        
        zones = load_zones()
        new_id = max([zone['id'] for zone in zones] + [0]) + 1
        new_zone = {"id": new_id, "name": name, "points": points}
        zones.append(new_zone)
        save_zones(zones)
        return JsonResponse(new_zone)
    
    elif request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            zone_id = data.get('id')
            if zone_id is None:
                return HttpResponseBadRequest("Zone ID not found")
        except Exception:
            return HttpResponseBadRequest("Wrong JSON format")
        
        zones = load_zones()
        filtered_zones = [zone for zone in zones if zone['id'] != zone_id]
        if len(zones) == len(filtered_zones):
            return HttpResponseBadRequest("No zone with provided ID.")
        save_zones(filtered_zones)
        return JsonResponse({"status": "deleted"})
    
    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'DELETE'])
