import React from "react";
import AsyncComponent from "../../util/async-component";
import { Card, CardContent } from '@mui/material';
import './home-page.css';

export default class HomePage extends AsyncComponent {
    render() {
        return <Card sx={{ maxWidth: 300, minHeight: 300, margin: 5, backgroundColor: '#EEE' }}>
            <CardContent></CardContent>
        </Card>
    }
}