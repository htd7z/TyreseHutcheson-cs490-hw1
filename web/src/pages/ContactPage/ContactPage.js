import { Form, TextField, TextAreaField, Submit, FieldError } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import {Toaster, toast} from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`


const ContactPage = () => {
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    create({
      variables: {input: data,},
    })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <Form onSubmit={onSubmit}>
        <label>Name</label><br></br>
        <TextField name="name" validation={{required: true}}/><br></br>
        <FieldError name="name" /><br></br>

        <label>Email</label><br></br>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            }}} /><br></br>
        <FieldError name="email" /><br></br>

        <label>Message</label><br></br>
        <TextAreaField name="message" validation={{required: true}} /><br></br>
        <FieldError name="message" /><br></br>

        <Submit disabled={loading}>Send Message</Submit>
      </Form>
    </>
  )
}

export default ContactPage
