import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { colors, headers } from 'styles';

const BootstrapInput = withStyles(theme => ({
    // root: {
    //     'label + &': {
    //         // marginTop: theme.spacing(3),
    //     },
    // },
    input: {
        borderRadius: 5,
        position: 'relative',
        height: 'auto',
        backgroundColor: 'white',
        border: `1px solid ${colors.borderGrayColor()}`,
        // fontSize: 14,
        margin: 0,
        padding: '8px 22px 8px 15px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        ...headers.H5(colors.primaryText(), 'Medium'),
        '&:focus': {
            borderRadius: 5,
            borderColor: '#80bdff',
        },
    },
}))(InputBase);

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function CustomSelect({ name, data, onChange, prefix, suffix }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const handleChange = event => {
        setValue(event.target.value);
        onChange(event.target.value);
    };
    return (
        <div>
            <FormControl>
                {/* <InputLabel htmlFor="demo-customized-select-native">{name ? name : 'Freq'}</InputLabel> */}
                <NativeSelect id="demo-customized-select-native" value={value} onChange={handleChange} input={<BootstrapInput />}>
                    {/* <option aria-label="None" value="" /> */}
                    {/* <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option> */}
                    {data &&
                        data.map((el, index) => {
                            return (
                                <option key={el} value={el} style={{ marginBottom: 10 }}>
                                    {prefix ? prefix : ''}
                                    {el}
                                    {suffix ? suffix : ''}
                                </option>
                            );
                        })}
                    {!data && <option aria-label="None" value="" />}
                </NativeSelect>
            </FormControl>
        </div>
    );
}
