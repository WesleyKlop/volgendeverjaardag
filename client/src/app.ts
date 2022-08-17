import "./app.css";

const findNextBirthDay = async (code: string) => {
  const response = await fetch(`/api/birthdays/${encodeURIComponent(code)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-cache",
  }).then((r) => r.ok && r.json());

  if (typeof response === "boolean") {
    return "Deze groep bestaat niet.";
  }
  console.log(response);
  return response;
};

const $form = document.querySelector<HTMLFormElement>("#code-form")!;
const $result = document.querySelector<HTMLDivElement>("#result")!;

$form.addEventListener(
  "submit",
  async (evt) => {
    evt.preventDefault();

    const nextBirthDayInfo = await findNextBirthDay($form.code.value);

    $result.innerHTML = nextBirthDayInfo;
    $form.reset();
  },
  { once: false }
);
