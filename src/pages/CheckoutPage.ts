<!-- Checkout Page -->
<section class="section">
  <div class="container">
    <h1 class="title is-2 has-text-black">Checkout Page</h1>

    <form id="checkout-form" class="box" style="max-width: 600px; margin-top: 2rem;">
      <div class="field">
        <label class="label">Full Name</label>
        <div class="control">
          <input class="input" type="text" name="name" placeholder="Your full name" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Address</label>
        <div class="control">
          <input class="input" type="text" name="address" placeholder="Shipping address" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Payment Method</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select name="payment" required>
              <option value="">Select method</option>
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="apple">Apple Pay</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field mt-5">
        <div class="control">
          <button type="submit" class="button is-primary is-fullwidth">Place Order</button>
        </div>
      </div>
    </form>

    <p id="checkout-message" class="has-text-success mt-4"></p>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    const message = document.getElementById('checkout-message');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      message.textContent = 'Your order has been placed successfully!';
      form.reset();
    });
  });
</script>
