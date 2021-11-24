import {useState, useEffect} from 'react'
import axios from 'axios'
import Yoda from '../assets/babyYoda.jpg'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider'
import { makeStyles } from '@mui/styles';
import FormControl from "@mui/material/FormControl"
import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper'






const Photo = () => {

    const [date, setDate] = useState(1)
    const [month, setMonth] = useState(1)
    const [disableForwardButton, setDisableForwardButton] = useState(false)
    const [disableBackButton, setDisableBackButton] = useState(true)
    const [year, setYear] = useState(2010)
    const [imageString, setImageString] = useState("")
    const [titleString, setTitleString] = useState("")
    const [stringVariant, setStringVariant] = useState('')
    const [open, setOpen] = useState(false)
    const [description, setDescription] = useState("")
    const [dateString, setDateString] = useState("")



    const useStyles = makeStyles({
        formText: {
            color: '#fff'
        },

    });

    const classes = useStyles();


    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=OVxF4BqhlOYbNevVJPijtFanmDcCxN5UQ8SG3Fii&date=${year}-${month}-${date}&hd=true`)
            .then(res => {
                if(res.data.media_type === 'image'){
                    setImageString(res.data.hdurl)
                    setTitleString(res.data.title)
                    setStringVariant('h1')
                    setDescription(res.data.explanation)
                    setDateString(res.data.date)
                } else {
                    setImageString(Yoda)
                    setTitleString("This image doesn't exist in the database, so here's a photo of Baby Yoda being a total vibe.")
                    setStringVariant('h4')
                    setDescription("Ok... I know his name is Grogu. To me, he will always be Baby Yoda.")
                    setDateString("Born 41 BBY")
                }
            })
            .catch(err => console.log(err))
            
    }, [date, month, year])


    const forwardClickHandler = () => {
        setDate(date + 1)
        if(date > 0){
            setDisableBackButton(false)
        }
        if(date === 29){
            setDisableForwardButton(true)
        }
    }

    const backClickHandler = () => {
        setDate(date -1)
        if(date < 3) {
            setDisableBackButton(true)
        }
        if(date < 31){
            setDisableForwardButton(false)
        }
}


    const handleChange = (event) => {
        setMonth(event.target.value)
        setDate(1)
        setDisableForwardButton(false)
        setDisableBackButton(true)
    }

    const collectionChangeHandler = () => {
        if(year < 2021)
        {   
            setDate(1)
            setMonth(1)
            setYear(year + 1)
            setDisableForwardButton(false)
            setDisableBackButton(true)
        } else {
            setYear(2010)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleToggle = () => {
        setOpen(!open)
    }


    return (
        <div>
            
            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='row' mt={3}  >
                <IconButton disabled={disableBackButton}>
                    <ArrowBackIosIcon color='primary' onClick={backClickHandler} sx={{fontSize:[30,75,85,100]}} />
                </IconButton>

                <img src={ imageString  } />
                
                <IconButton disabled={disableForwardButton}>
                    <ArrowForwardIosIcon color='primary' onClick={forwardClickHandler} sx={{fontSize:[30,75,85,100]}} />
                </IconButton>
            </Box>
            <Box my={2} display='flex' alignItems='center' flexDirection='column'>
                <Button variant='contained' onClick={collectionChangeHandler} color='secondary' sx={{mb:2}}>Change Collection</Button>
                <FormControl variant='standard' >
                    <Select value={month} onChange={handleChange} label="Month" className={classes.formText}  >
                        <MenuItem value={1} >January</MenuItem>
                        <MenuItem value={2} >February</MenuItem>
                        <MenuItem value={3} >March</MenuItem>
                        <MenuItem value={4} >April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Divider />

            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' >
                <Typography gutterBottom textAlign='center' variant={stringVariant} color='primary' fontWeight='bold' sx={{mt:3, px:3, textShadow:'3px 3px black'}}>
                    {titleString}
                </Typography>
                <Button variant='contained' onClick={handleToggle} sx={{mb:3}} >Learn More</Button>
                <Typography variant='body1' textAlign='center' color='primary' sx={{textShadow:'1px 1px black', mb:3}}>
                    {dateString}
                </Typography>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <Paper sx={{maxWidth:[300,450,500,600], px:5, py:5, bgcolor:'secondary.main', color: 'primary.main'}}>
                        <Typography variant='h3' textAlign='center' gutterBottom >{titleString}</Typography>
                        <Typography variant='body1'>{description}</Typography>
                    </Paper>
                </Backdrop>
            </Box>
        </div>
    )
}

export default Photo
