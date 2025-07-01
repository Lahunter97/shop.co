import router from '../router';

export default function renderConfirmationPage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section';
  section.innerHTML = `
    <div class="container confirmation-page">
      <nav class="breadcrumb mb-5" aria-label="breadcrumbs">
        <ul>
          <li><a href="/">Home</a></li>
          <li class="is-active"><a aria-current="page">Order Confirmation</a></li>
        </ul>
      </nav>

      <h1 class="title is-2 has-text-black">Order Confirmation</h1>
      <p class="confirmation-message">
  Success! Your order has been confirmed. Please check out your email address to track delivery progress.
</p>
    </div>
  `;

  // Redirect after 5 seconds
  setTimeout(() => {
    router.navigate('/');
  }, 5000);

  return section;
}
