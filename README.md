## Digital Inclusion App 
Visit live site at [http://getonlinekc.org](http://getonlinekc.org/)  

### For developers
* [Contributing](https://github.com/clintecum/digital-inclusion/blob/master/CONTRIBUTING.md)
* [Getting started](#getting-started)
* [Data](#data) 

# Data
#### _Example_
###### Geojson file formatted for client-side:
```javascript
{
 "type":     "FeatureCollection",
 "features": [
			  {
			   "type":       "Feature",
			   "geometry":   {
						      "type":"Point",
						      "coordinates": [lng,lat]
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

###Getting started
Instructions
* [Mac / Linux](#unix)
* [Windows](#windows)

##### Windows 
no information available 

##### Unix  
_Mac or linux users_
 * Setup Instructions:
   - Clone repository
   - npm install