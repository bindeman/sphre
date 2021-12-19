import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SettingsIcon from '@mui/icons-material/Settings';
// import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import {Add, Search} from "@material-ui/icons";
import {InputAdornment, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {getGraphColor, indicators} from "./constants";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import {makeStyles} from "@material-ui/core/styles";

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            padding: 8,
            borderBottom: `1px solid  ${
                theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
            }`,
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent',
            },
            '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: 'Helvetica Neue, Helvetica, Arial',
        letterSpacing: '-0.03em',
    },
    categoryTitle: {
        fontSize: 13,
        textAlign: "left",
        fontWeight: 500,
        marginTop: 40,
        marginBottom: 5,
        marginLeft: 14,
    },
    listPin: {
        minWidth: "6px",
        height: "21px",
        flexShrink: 0,

        marginRight: "16px",
        borderRadius: "3px",
        backgroundColor: "#EBEBEB",
    },
    iconColor: {
        '&': {
            transition: '0.25s',
            color: '#A6A6A6',
        },
        '&:hover': {
            transition: '0.25s',
            color: '#868686',
        },
    },

}));

function PopperComponent(props) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
    anchorEl: PropTypes.any,
    disablePortal: PropTypes.bool,
    open: PropTypes.bool.isRequired,
};

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
    boxShadow: `0 8px 24px ${
        theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
    }`,
    borderRadius: 8,
    width: 220,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: '100%',
    borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
    }`,
    '& input': {
        borderRadius: 20,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: '6px 8px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
        fontSize: 14,
        '&:focus': {
            boxShadow: `0px 0px 0px 3px ${
                theme.palette.mode === 'light'
                    ? 'rgba(3, 102, 214, 0.3)'
                    : 'rgb(12, 45, 107)'
            }`,
            borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
        },
    },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
    fontSize: 13,
    width: '100%',
    textAlign: 'left',
    paddingBottom: 8,
    color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
    fontWeight: 600,
    '&:hover': {
        color: theme.palette.mode === 'light' ? '#0366d6' : '#58a6ff',
    },
    '& span': {
        width: '100%',
    },
    '& svg': {
        width: 16,
        height: 16,
    },
}));

export default function IndicatorSelector(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState(props.selectedOptions);
    const [pendingValue, setPendingValue] = React.useState([]);
    const theme = useTheme();
    const classes = useStyles();

    const optionArr = Object.keys(props.options);

    const handleClick = (event) => {
        setPendingValue(value);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setValue(pendingValue);
        props.onSelect(pendingValue);
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'github-label' : undefined;

    return (
        <React.Fragment>
            <Box sx={{ width: 221, fontSize: 13 }}>
                <Button disableRipple aria-describedby={id} onClick={handleClick}>
                    <span>Indicators</span>
                    <Add />
                </Button>
                <List dense={true}>
                {props.selectedOptions.map((label, index, arr) => (
                    <>
                    <ListItem>
                        {/* <ListItemAvatar disablePadding> */}
                        {/*<h1 className={classes.listPin} style={{color: '#EBEBEB'}}>{index+1}</h1>*/}
                        <div className={classes.listPin}>

                        </div>
                        {/* </ListItemAvatar> */}
                        <ListItemText
                            primary={indicators[label]}
                            secondary={arr.length < 6 && label}
                        />
                        {/*<ListItemSecondaryAction>*/}
                        {/*    /!*<IconButton edge="end" aria-label="delete">*!/*/}
                        {/*    <RemoveCircleOutlinedIcon className={classes.iconColor} />*/}
                        {/*    /!*</IconButton>*!/*/}
                        {/*</ListItemSecondaryAction>*/}
                    </ListItem>
                    {/*<Box*/}
                    {/*    key={label.name}*/}
                    {/*    sx={{*/}
                    {/*        mt: '3px',*/}
                    {/*        height: 20,*/}
                    {/*        padding: '.15em 4px',*/}
                    {/*        fontWeight: 600,*/}
                    {/*        lineHeight: '15px',*/}
                    {/*        borderRadius: '2px',*/}
                    {/*    }}*/}
                    {/*    style={{*/}
                    {/*        backgroundColor: label.color,*/}
                    {/*        color: theme.palette.getContrastText(label.color),*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {label.name}*/}
                    {/*</Box>*/}
                    </>
                ))}
                </List>
            </Box>
            <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose}>
                    <div>
                        <Autocomplete
                            open
                            multiple
                            onClose={(event, reason) => {
                                if (reason === 'escape') {
                                    handleClose();
                                }
                            }}
                            value={pendingValue}
                            onChange={(event, newValue, reason) => {
                                if (
                                    event.type === 'keydown' &&
                                    event.key === 'Backspace' &&
                                    reason === 'removeOption'
                                ) {
                                    return;
                                }
                                setPendingValue(newValue);
                            }}
                            disableCloseOnSelect
                            PopperComponent={PopperComponent}
                            renderTags={() => null}
                            noOptionsText="No results"
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>

                                    {/*<div className={classes.listPin} style={{backgroundColor: option.color}}>*/}

                                    {/*</div>*/}
                                    {/*<Box*/}
                                    {/*    component="img"*/}
                                    {/*    src={`https://flagcdn.com/w80/${option.toLowerCase()}.png`}*/}
                                    {/*    sx={{*/}
                                    {/*        width: 20,*/}
                                    {/*        flexShrink: 0,*/}
                                    {/*        mr: 1.5,*/}
                                    {/*        ml: 1,*/}
                                    {/*        mt: '5px'*/}

                                    {/*    }}*/}


                                    {/*    // style={{ backgroundImage:  `url("https://flagcdn.com/w80/${option.toLowerCase()}.png")`}}*/}
                                    {/*/>*/}
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            '& span': {
                                                color:
                                                    theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                                            },
                                        }}
                                    >
                                        {indicators[option]}
                                        <br />
                                        <span>{option}</span>
                                    </Box>
                                    {/*<Box*/}
                                    {/*    component={CloseIcon}*/}
                                    {/*    sx={{ opacity: 0.6, width: 18, height: 18 }}*/}
                                    {/*    style={{*/}
                                    {/*        visibility: selected ? 'visible' : 'hidden',*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                    <Box
                                        component={DoneIcon}
                                        sx={{ width: 17, height: 17, mr: '5px', ml: '-2px', mt: '11px' }}
                                        style={{
                                            visibility: selected ? 'visible' : 'hidden',
                                        }}
                                    />
                                </li>
                            )}
                            options={[...optionArr].sort((a, b) => {
                                // Display the selected labels first.
                                let ai = props.selectedOptions.indexOf(a);
                                ai = ai === -1 ? props.selectedOptions.length + optionArr.indexOf(a) : ai;
                                let bi = props.selectedOptions.indexOf(b);
                                bi = bi === -1 ? props.selectedOptions.length + optionArr.indexOf(b) : bi;
                                return ai - bi;
                            })}
                            getOptionLabel={(option) => indicators[option]}
                            renderInput={(params) => (
                                <StyledInput
                                    ref={params.InputProps.ref}
                                    inputProps={params.inputProps}
                                    autoFocus
                                    placeholder="Search"
                                    // startAdornment ={
                                    //     <InputAdornment position="start">
                                    //         <Search/>
                                    //     </InputAdornment>
                                    // }
                                />
                            )}
                        />
                    </div>
                </ClickAwayListener>
            </StyledPopper>
        </React.Fragment>
    );
}