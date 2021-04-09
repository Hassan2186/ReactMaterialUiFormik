import { Card, CardContent, MenuItem, TextField, Typography,FormControl, FormControlLabel, FormLabel, Checkbox, FormGroup, Grid, Button, RadioGroup, Radio } from '@material-ui/core'
import { Formik, Form, useField, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import TextError from './TextError'

const checkBoxList = [
    {key: 'Option 1', value:'option1'},
    {key: 'Option 2', value:'option2'},
    {key: 'Option 3', value:'option3'}
]
const selectList = [
    {key: 'Select...', value: ''},
    {key: 'Zero', value: 0},
    {key: 'One', value: 1},
    {key: 'Two', value: 2},
    {key: 'Three', value: 3},
    {key: 'Four', value: 4},
    {key: 'Five', value: 5}
]
const RadioList = [
    {key: 'Option 1', value:'option1'},
    {key: 'Option 2', value:'option2'},
    {key: 'Option 3', value:'option3'}
]
const initialValues = {
    fullName:'',
    howMuch: 0,
    howMany: [],
    comments: '',
    select: '',
    radio:'',
    terms: false
}
const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Required').min(2,'To Short').max(100,'To Large'),
    howMuch: Yup.number().required('Required').min(100,'Must more than 100'),
    terms: Yup.boolean().oneOf([true], 'Must Accept!'),
    select: Yup.string().required("Must select!"),
    howMany: Yup.array().min(1, "Must chose!").required(),
    comments: Yup.string().required('Required'),
    radio: Yup.string().required('Must chose!'),
    // comments: Yup.mixed().when('howMany', {
    //     is: 'High',
    //     then: Yup.string().required().min(20).max(100),
    //     otherwise: Yup.string().min(20).max(100)
    // }),
    // comments: Yup.mixed().when('howMany', {
    //     is: (howMany) => howMany.find(ir => ir === 'High'),
    //     then: Yup.string().required().min(20).max(100),
    //     otherwise: Yup.string().min(20).max(100)
    // }),

    })
    const onSubmit = (values, formikHelpers) => {
        console.log('values', values)
        console.log('formikHelpers', formikHelpers)
        console.log('-------------')
    } 


export const FormDemo = () => {
    return (
        <Card>
            <CardContent>
                <Grid alignContent='center' xs={12}>New Account</Grid>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({values, errors, isSubmitting, isValidating}) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <MyTextField name='fullName' label='Full Name' type='text'></MyTextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                            <MyTextField name='howMuch' type='number' label='Initial Investment'></MyTextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                            <MyCheckBox name='howMany' type='checkbox' options={checkBoxList}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                            <MyTextField name='comments' label='Message' multiline rows={3} rowsMax={10}></MyTextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormGroup>
                                            <MySelect name='select' label='Select Something' options={selectList}> </MySelect>
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyRadio name='radio' options={RadioList}></MyRadio>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MyAcception name='terms' type='checkbox' label='Accept Terms and Conditions'/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant='contained' color='secondary' fullWidth type='submit' disabled={isValidating}>Submit</Button>
                                    </Grid>
                                </Grid>
                                <Grid container justify='center'>
                                    <Grid item xs = {6}>
                                        <Typography>The Errors</Typography>
                                        <pre>{JSON.stringify(errors, null, 4)}</pre>
                                    </Grid>
                                    <Grid item xs = {6}>
                                        <Typography>The Values</Typography>
                                        <pre>{JSON.stringify(values, null, 4)}</pre>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
            </CardContent>
        </Card>
    )
}

export const MyCheckBox = (props) => {
    const {name, options, type} = props
    const [field, meta] = useField(name)
    const configFormControl = {};
    if(meta && meta.touched && meta.error) {
        configFormControl.error = true;
    }
    const configCheckBox = {
        ...field,
    }
    return (
        <>
        <FormControl  {...configFormControl}>
            <FormLabel component="legend">Select How Many You Want</FormLabel>
            <FormGroup>
                {options.map(item => (
        <FormControlLabel control={<Checkbox key={item.value} name={name} type={type} {...configCheckBox} value={item.value}></Checkbox>} label={item.key}/>
    ))}
            </FormGroup>
        </FormControl>
        <ErrorMessage name={name} component={TextError}></ErrorMessage>
        </>
    )
}
export const MyTextField = (props) => {
    const {name, label, type, ...rest} = props
    const [field, meta] = useField(name)
    const configTextField = {
        ...field,
        ...rest,
        name,
        label,
        type,
        variant: 'outlined'
    }
    if (meta && meta.touched && meta.error){
        configTextField.error = true;
        configTextField.helperText = meta.error
    }
    return (
    <FormGroup>
        <TextField {...configTextField}></TextField>
    </FormGroup>
    
    )
}


export const MySelect = (props) => {
    const {name, label, options, ...rest} = props
    const [field, meta] = useField(name)
    const configSelect = {
        ...field,
        ...rest,
        name,
        label,
        options,
        select: true,
        variant: 'outlined'
    }
    if (meta && meta.touched && meta.error){
        configSelect.error = true;
        configSelect.helperText = meta.error
    }
    return (
    <FormGroup>
        <TextField {...configSelect}>
            {options.map((item, index)=>(
                <MenuItem key={item.value} value={item.value}>{item.key}</MenuItem>
            ))}
        </TextField>
    </FormGroup>
    
    )
}


export const MyRadio = (props) => {
    const {name, options, ...rest} = props;
    const [field, meta] = useField(name);
    const configRadio = {
        ...field,
        ...rest,
        name,
        options
    }
    const configFormControl = {}
    if(meta && meta.touched && meta.error) {
        configFormControl.error = true;
    }
    return (
        <>
        <FormControl {...configFormControl}>
            <FormLabel component='legend'>Choose One</FormLabel>
            <RadioGroup>
                {options.map((item)=>(
                    <FormControlLabel key={item.value} name={name} {...field} value={item.value} control={<Radio></Radio>} label={item.key}></FormControlLabel>
                ))}
            </RadioGroup>
        </FormControl>
        <ErrorMessage name={name} component={TextError}></ErrorMessage>
        </>
    )
}

export const MyAcception = (props) => {
const {name, type, label, ...rest} = props
    const [field, meta] = useField(name)
    const configFormControl = {};
    if(meta && meta.touched && meta.error) {
        configFormControl.error = true;
    }
    const configAcception = {
        ...field,
        ...rest,
        name,
        type,
        label,
    }
    return (
        <>
        <FormControl  {...configFormControl}>
            <FormLabel component="legend">Accept Conditions?</FormLabel>
            <FormGroup>
        <FormControlLabel control={<Checkbox name={name} {...configAcception}></Checkbox>}/>
            </FormGroup>
        </FormControl>
        <ErrorMessage name={name} component={TextError}></ErrorMessage>
        </>
    )
}




                                    