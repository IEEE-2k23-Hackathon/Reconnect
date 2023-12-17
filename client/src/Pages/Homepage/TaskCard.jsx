// LizardCard.js
import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TaskCard = ({ title, description, image, id }) => {
    const generateDynamicRoute = () => {
        // Replace this with your dynamic route generation logic
        return `/Task/${title}`;
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button fullWidth sx={{ backgroundColor: '#7E30E1', color: 'white', '&:hover': { color: 'black' , backgroundColor:'lightpink' } }} component={Link} to={generateDynamicRoute()}>
                View Tasks
            </Button>
        </Card>
    );
};
export default TaskCard;
