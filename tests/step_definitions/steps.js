const { I } = inject();

Given('я нахожусь на странице {string}', (page) => {
  switch (page) {
    case "Регистрация":
      return I.amOnPage('/register');
    case "Логин":
      return I.amOnPage('/login');
    default:
      return I.amOnPage('/');
  }
});

Given('я ввожу в поля формы:', (table) => {
  table.rows.forEach(row => {
    console.log(row.cells);
    I.fillField(row.cells[0].value, row.cells[1].value);
  });
});

Given('нажимаю на кнопку формы {string}', (buttonText) => {
  I.click(buttonText, {css: 'form'});
});

Then('я должен увидеть текст {string}', (text) => {
  I.see(text);
});
