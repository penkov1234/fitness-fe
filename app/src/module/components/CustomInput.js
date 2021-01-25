import React, { useState, useEffect, useRef } from 'react';
import { fade, ThemeProvider, withStyles, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import { headers, colors } from 'styles';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity, Image } from 'react-native';
import searchPNG from 'assets/icons-for-web/search-512.png';
import TextAndPicture from 'module/components/TextAndPicture';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
            flexBasis: '100%',
        },
    },
    input: {
        borderRadius: 5,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${colors.borderGrayColor()}`,
        // fontSize: 14,
        width: '100%',
        height: 'auto',
        padding: '8px 8px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        ...headers.H5(colors.primaryText(), 'Medium'),
        '&:focus': {
            borderRadius: 5,
            // borderColor: '#80bdff',
            borderWidth: 2,
            // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export default function CustomInput({ value, setValue, hasOptions, options, hasSearch, style, maxSize, hasTextAndPicture }) {
    const [focused, setFocused] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [currentScrolledIndex, setCurrentScrolledIndex] = useState(-1);
    const [currentlyViewedOption, setCurrentlyViewedOption] = useState(false);

    const scrollRef = useRef(null);
    const bootstrapInputRef = useRef(null);
    const searchRef = useRef(null);
    const STANDARD_INPUT_WIDTH = 220;
    const STANDARD_INPUT_HEIGHT = 40;

    const [localValue, setLocalValue] = useState(value);

    const [data, setData] = useState([
        {
            name: 'option 1',
        },
        { name: 'option 2' },
    ]);

    useEffect(() => {
        if (hasOptions && scrollRef.current && currentScrolledIndex >= 0 && filteredOptions) {
            setLocalValue(filteredOptions[currentScrolledIndex].name);
            scrollRef.current.scrollTo({ x: 0, y: currentScrolledIndex * STANDARD_INPUT_HEIGHT, animated: false });
            filteredOptions.forEach((el, index) => {
                el.hovered = false;
                // console.log(index, currentScrolledIndex);
                if (index === currentScrolledIndex) {
                    el.hovered = true;
                }
            });
            setCurrentlyViewedOption(filteredOptions[currentScrolledIndex]);
            setFilteredOptions(filteredOptions);
        } else if (hasOptions && scrollRef.current && filteredOptions && currentScrolledIndex == -1) {
            setLocalValue('');
            // scrollRef.current.scrollTo({ x: 0, y: 0, animated: false });
            resetFocusedFields();
        }
    }, [currentScrolledIndex]);

    useEffect(() => {
        if (!focused) {
            setCurrentlyViewedOption(false);
        }
    }, [focused]);

    useEffect(() => {
        if (hasOptions) {
            setLocalValue(value);
        }
    }, [value]);
    useEffect(() => {
        if (options) {
            if (value === '') {
                setFilteredOptions(options);
            } else {
                // console.log(options);
                setFilteredOptions(
                    options.filter(el => {
                        let flag = el.name
                            .toLowerCase()
                            .trim()
                            .includes(localValue.toLowerCase().trim());
                        if (!flag && el.author) {
                            flag = el.author
                                .toLowerCase()
                                .trim()
                                .includes(localValue.toLowerCase().trim());
                        }
                        return flag;
                    })
                );
            }
        }
    }, [value, options]);

    function handleChange(value) {
        // console.log('value is ', value);
        setCurrentScrolledIndex(-1);

        setValue({ name: value, id: null });
    }

    function resetFocusedFields() {
        if (filteredOptions) {
            filteredOptions.forEach((el, index) => {
                el.hovered = false;
            });
            setFilteredOptions(filteredOptions);
        }
    }

    // console.log(scrollRef);

    // useEffect(() => {
    //     if (scrollRef.current) {
    //         scrollRef.current.scrollTo({ x: 0, y: 4 * 40, animated: false });
    //     }
    // });

    // console.log(value, localValue, currentScrolledIndex, filteredOptions);

    return (
        <FormControl>
            <BootstrapInput
                tabIndex="0"
                ref={bootstrapInputRef}
                onKeyDown={event => {
                    if (hasOptions) {
                        if (event.keyCode == '38') {
                            // up arrow
                            if (currentScrolledIndex >= 0) {
                                setCurrentScrolledIndex(currentScrolledIndex - 1);
                            }
                        } else if (event.keyCode == '40') {
                            // down arrow
                            // if (currentScrolledIndex < filteredOptions.length) {
                            if (!focused) {
                                setFocused(true);
                            } else {
                                setCurrentScrolledIndex(
                                    currentScrolledIndex + 1 < filteredOptions.length - 1 ? currentScrolledIndex + 1 : filteredOptions.length - 1
                                );
                            }
                            // }
                        } else if (event.keyCode == '37') {
                            // left arrow
                        } else if (event.keyCode == '39') {
                            // right arrow
                        } else if (event.key === 'Enter') {
                            // enter
                            setFocused(false);
                            resetFocusedFields();
                            if (currentScrolledIndex >= 0 && filteredOptions[currentScrolledIndex]) {
                                setValue(filteredOptions[currentScrolledIndex]);
                            }
                            // setCurrentScrolledIndex(-1);
                        }
                    }
                }}
                style={{
                    flexBasis: '60%',
                    maxWidth: maxSize ? maxSize : STANDARD_INPUT_WIDTH,
                    minWidth: 0,
                }}
                onBlur={event => {
                    // console.log('focus out');
                    setCurrentScrolledIndex(-1);
                    setFocused(false);
                    resetFocusedFields();
                }}
                onFocus={event => {
                    // console.log(event);

                    setFocused(true);
                    setCurrentScrolledIndex(-1);
                }}
                value={hasOptions ? localValue : value}
                onChange={event => handleChange(event.target.value)}
                // id="bootstrap-input"
            />
            {hasOptions && focused && (
                <View style={{ position: 'absolute', top: 36, left: 5, zIndex: 9999, borderTopColor: colors.borderGrayColor(40), borderTopWidth: 1 }}>
                    <ScrollView ref={scrollRef} style={{ maxHeight: 200, boxShadow: '-3px 2px 6px -1px' + ' rgba(0,0,0,0.4)' }}>
                        {filteredOptions &&
                            filteredOptions.map(el => {
                                return (
                                    <TouchableOpacity
                                        key={el.id}
                                        onMouseEnter={() => {
                                            el.hovered = true;
                                            setFilteredOptions([...filteredOptions]);
                                            setCurrentlyViewedOption(el);
                                        }}
                                        onMouseLeave={() => {
                                            el.hovered = false;
                                            setFilteredOptions([...filteredOptions]);
                                            // setCurrentlyViewedOption(false);
                                        }}
                                        style={{
                                            width: maxSize ? maxSize : STANDARD_INPUT_WIDTH,
                                            height: STANDARD_INPUT_HEIGHT,
                                            backgroundColor: el.hovered ? colors.borderGrayColor(90) : colors.optionsColor(),
                                            boxShadow: '-3px 2px 6px -1px' + ' rgba(0,0,0,0.4)',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            setValue(el);
                                        }}
                                    >
                                        <Text style={[headers.H6('black', 'Light'), { paddingLeft: 20 }]}>
                                            {el.name}
                                            <Text style={[headers.H6('black', 'Medium')]}>{el.author ? ` by ${el.author}` : ''} </Text>
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                    </ScrollView>
                    {hasSearch && (
                        <View
                            ref={searchRef}
                            style={{
                                width: maxSize ? maxSize : STANDARD_INPUT_WIDTH,
                                // height: 40,

                                minHeight: STANDARD_INPUT_HEIGHT,
                                backgroundColor: 'white',
                                boxShadow: '-3px 2px 6px -1px' + ' rgba(0,0,0,0.4)',
                                // justifyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image source={searchPNG} style={{ width: 25, height: 25, margin: 10 }} />

                            <Text style={[headers.H5(null, 'Medium'), { wordBreak: 'break-word', margin: 10 }]}>
                                Search: <Text style={[headers.H5('black', 'Light')]}>{localValue}</Text>
                            </Text>
                        </View>
                    )}
                </View>
            )}
            {hasOptions && hasTextAndPicture && currentlyViewedOption && (
                <View style={{ position: 'absolute', top: -150, left: maxSize ? maxSize + 20 : STANDARD_INPUT_WIDTH + 20, zIndex: 9999 }}>
                    <TextAndPicture
                        style={{ width: 300, height: 400, backgroundColor: '#fafafa' }}
                        title={currentlyViewedOption.name}
                        text={currentlyViewedOption ? currentlyViewedOption.description : ''}
                        imageSource={currentlyViewedOption ? currentlyViewedOption.imageUrl : ''}
                    />
                </View>
            )}
        </FormControl>
    );
}
