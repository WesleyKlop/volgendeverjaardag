import './app.css';

const findNextBirthDay = async (code: string) => {
    const response = await fetch(`/api/birthdays/${encodeURIComponent(code)}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        cache: "no-cache",
    }).then(r => r.ok && r.json())

    console.log(response)
}

const $form = document.querySelector<HTMLFormElement>('#code-form')!;

$form.addEventListener('submit', async (evt) => {
    evt.preventDefault()

    const nextBirthDayInfo = await findNextBirthDay($form.code.value)

    $form.reset()
}, {once: false})