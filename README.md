### Digital Inclusion App 
Visit live site at [http://getonlinekc.org](http://getonlinekc.org/)  

#### For developers
* [Contributing](https://github.com/clintecum/digital-inclusion/blob/master/CONTRIBUTING.md)
* [Getting Started](#getting-started)
* [Data](#data) 

#getting-started
* [Mac](#mac)
* [Windows](#windows)
* [Linux](#linux)

need useful information here

#data
#### _Real Example_
###### Geojson file formatted for client-side:
```javascript
{
 "type":     "FeatureCollection",
 "features": [
			  {
			   "type":       "Feature",
			   "geometry":   {
						      "type":"Point",
						      "coordinates":[lng, lat]
					   	     },
			   "properties": {
						      "name": string,
							  "category": string,
							  "street": string,
							  "google_id": string
						     }
			  }
			 ]
}
```