import { Answers } from 'inquirer'
import { Question, QuestionSet } from 'nest-commander'

@QuestionSet({ name: 'create-admin' })
export class CreateAdminQuestions {
    @Question({
        name: 'firstName',
        message: 'First Name: ',
        validate: (input: string, answers: Answers) => {
            if (!input) return 'You Should Enter A Value...'
            return true
        },
    })
    parseFirstName(val: string) {
        return val.trim()
    }

    @Question({
        name: 'lastName',
        message: 'Last Name: ',
        validate: (input: string, answers: Answers) => {
            if (!input) return 'You Should Enter A Value...'
            return true
        },
    })
    parseLastName(val: string) {
        return val.trim()
    }

    @Question({
        name: 'username',
        message: 'Username: ',
        validate: (input: string, answers: Answers) => {
            if (!input) return 'You Should Enter A Value...'
            return true
        },
    })
    parseEmail(val: string) {
        return val.trim().toLowerCase()
    }

    @Question({
        name: 'password',
        message: 'Password: ',
        validate: (input: string, answers: Answers) => {
            if (!input) return 'You Should Enter A Value...'
            if (input.length < 8)
                return 'Password Should Be At least 8 Chars...'
            return true
        },
    })
    parsePassword(val: string) {
        return val
    }

    @Question({
        name: 'confirmPassword',
        message: 'Confirm Password: ',
        validate: (input: string, answers: Answers) => {
            if (!input) return 'You Should Enter A Value...'
            if (input.length < 6)
                return 'Password Should Be At least 6 Chars...'
            if (input !== answers.password) return 'Password Not Match...'
            return true
        },
    })
    parseConfirmPassword(val: string) {
        return val
    }
}
