export default function renderCheckoutPage(cartId: string): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section';

  section.innerHTML = `
    <div class="container">
      <h1 class="title is-2 has-text-black has-text-centered">Checkout</h1>
      <form id="checkout-form" class="checkout-form">
        <div class="field">
          <label class="label">First Name</label>
          <input class="input" name="firstName" type="text" required minlength="3" maxlength="32" />
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <input class="input" name="lastName" type="text" required minlength="3" maxlength="32" />
        </div>
        <div class="field">
          <label class="label">Maiden Name</label>
          <input class="input" name="maidenName" type="text" required minlength="3" maxlength="32" />
        </div>
        <div class="field">
          <label class="label">Email</label>
          <input class="input" name="email" type="email" required />
        </div>
        <div class="field">
          <label class="label">Phone</label>
          <input class="input" name="phone" type="tel" placeholder="+63 739 292 7942" required />
        </div>
        <div class="field">
          <label class="label">Address</label>
          <input class="input" name="address" type="text" placeholder="1745 T Street Southeast" required />
        </div>
        <div class="field">
          <label class="label">City</label>
          <input class="input" name="city" type="text" required />
        </div>
        <div class="field">
          <label class="label">Postal Code</label>
          <input class="input" name="postalCode" type="text" required />
        </div>
        <div class="has-text-centered mt-5">
          <button type="submit" class="button is-black has-text-white">Go to Payment</button>
        </div>
      </form>
    </div>
  `;

  const form = section.querySelector('#checkout-form') as HTMLFormElement;
  const inputs = form.querySelectorAll('input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach((input) => {
      const name = input.name;
      const value = input.value.trim();
      let valid = true;

      switch (name) {
        case 'firstName':
        case 'lastName':
        case 'maidenName':
          valid = value.length >= 3 && value.length <= 32;
          break;
        case 'email':
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          break;
        case 'phone':
          valid = /^\+\d{1,3}(?: \d{3}){3,}$/.test(value);
          break;
        case 'address':
          valid = /^\d{4} .+/.test(value);
          break;
        case 'city':
        case 'postalCode':
          valid = value !== '';
          break;
      }

      if (!valid) {
        input.classList.add('is-danger');
        isValid = false;
      } else {
        input.classList.remove('is-danger');
      }
    });

    if (isValid) {
      location.href = `/payment?cartId=${cartId}`;
    }
  });

  return section;
}
