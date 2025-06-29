import router from '../router';

export default function renderCheckoutPage(cartId: string): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section';
  section.innerHTML = `
    <div class="container checkout-page" style="padding: 0 20px;">
      <nav class="breadcrumb mb-5" aria-label="breadcrumbs">
        <ul>
          <li><a href="/">Home</a></li>
          <li class="is-active"><a aria-current="page">Checkout</a></li>
        </ul>
      </nav>

      <h1 class="title is-2 has-text-black">Checkout Page</h1>

      <div class="columns is-variable is-8">
        <div class="column" style="width: 70%; padding-right: 10px;">
          <form id="checkout-form" class="box checkout-form">
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input class="input" type="text" name="firstName" required minlength="3" maxlength="32">
              </div>
            </div>

            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input class="input" type="text" name="lastName" required minlength="3" maxlength="32">
              </div>
            </div>

            <div class="field">
              <label class="label">Maiden Name</label>
              <div class="control">
                <input class="input" type="text" name="maidenName" required minlength="3" maxlength="32">
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" name="email" required>
              </div>
            </div>

            <div class="field">
              <label class="label">Phone</label>
              <div class="control">
                <input class="input" type="text" name="phone" required pattern="^\\+\\d{1,3}( \\d{3}){3,4}$">
              </div>
            </div>

            <div class="field">
              <label class="label">Address</label>
              <div class="control">
                <input class="input" type="text" name="address" required pattern="^\\d{4} .+$">
              </div>
            </div>

            <div class="field">
              <label class="label">City</label>
              <div class="control">
                <input class="input" type="text" name="city" required>
              </div>
            </div>

            <div class="field">
              <label class="label">Postal Code</label>
              <div class="control">
                <input class="input" type="text" name="postalCode" required>
              </div>
            </div>
          </form>
        </div>

        <div class="column checkout-summary" style="width: 30%; padding-left: 10px; display: flex; flex-direction: column; justify-content: flex-start;">
          <div class="box has-background-light">
            <h2 class="title is-4 has-text-black">Order Summary</h2>
            <p class="has-text-grey">Subtotal: <span class="has-text-black has-text-weight-bold">$1289.90</span></p>
            <p class="has-text-grey">Discount: <span class="has-text-black has-text-weight-bold">$128.99</span></p>
            <p class="has-text-grey">Total: <span class="has-text-black has-text-weight-bold">$1160.91</span></p>
            <button type="submit" form="checkout-form" class="button is-black has-text-white is-fullwidth mt-4">Go to Payment</button>
          </div>
        </div>
      </div>

      <p id="checkout-message" class="has-text-success mt-4"></p>
    </div>
  `;

  const form = section.querySelector('#checkout-form') as HTMLFormElement;
  const message = section.querySelector('#checkout-message') as HTMLElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      Array.from(form.elements).forEach((el) => {
        if (el instanceof HTMLInputElement) {
          if (!el.checkValidity()) {
            el.classList.add('is-invalid');
          } else {
            el.classList.remove('is-invalid');
          }
        }
      });
      return;
    }

    router.navigate(`/payment/${cartId}`);
  });

  return section;
}
