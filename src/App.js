//App.js
import "./App.css"; 
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Container, Card, CardContent, Button, Typography, TextField } from "@mui/material";

<Container className="app-container">
  <Typography variant="h4" className="profile-title">
    Profile Explorer
  </Typography>
</Container>


const profiles = [
  { id: 1, name: "Mahesh Tambe", photo: "/mahesh.jpg", description: "Software Developer", lat: 18.5204, lng: 73.8567 },
  { id: 2, name: "Virat Kohli", photo: "/virat.jpg", description: "Cricketer", lat: 12.9716, lng: 77.5946 },
  { id: 2, name: "M S Dhoni", photo: "/ms.jpg", description: "Cricketer", lat: 13.0827, lng: 80.2707},
  { id: 2, name: "Rohit Sharma", photo: "/rohit.jpg", description: "Cricketer", lat: 19.0760, lng: 72.8777 },
];


const containerStyle = { width: "100%", height: "400px" };
const center = { lat: 39.8283, lng: -98.5795 };

const App = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [search, setSearch] = useState("");

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      { <Typography variant="h4" style={{ margin: "20px 0", textAlign: "center" }}>
        Profile Explorer
      </Typography> }

      <TextField
        label="Search Profiles"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {/* Profiles Displayed Horizontally */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {filteredProfiles.map((profile) => (
          <Card key={profile.id} style={{ width: "250px", textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6">{profile.name}</Typography>
              <img 
                src={profile.photo} 
                alt={profile.name} 
                style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} 
              />
              
              <Typography>{profile.description}</Typography>


              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setSelectedProfile(profile)} 
                style={{ marginTop: "10px" }}
              >
                Show on Map
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Below Profiles */}
      <div style={{ marginTop: "30px" }}>
        <LoadScript googleMapsApiKey="AIzaSyA_DZORG6Ubu7J7MTCRSQqB4pbozWhhzIQ">
          <GoogleMap 
            mapContainerStyle={containerStyle} 
            center={selectedProfile ? { lat: selectedProfile.lat, lng: selectedProfile.lng } : center} 
            zoom={selectedProfile ? 12 : 4}
          >
            {selectedProfile && (
              <Marker position={{ lat: selectedProfile.lat, lng: selectedProfile.lng }} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </Container>
  );
};

export default App;
