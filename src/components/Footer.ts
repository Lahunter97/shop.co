export default function renderFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'has-background-light has-text-dark pt-6';

  footer.innerHTML = `
    <section class="container mb-6" style="background-color: #000; border-radius: 30px; padding: 3rem 2rem; color: #fff; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;">
      <div style="flex: 1 1 50%; font-size: 2.5rem; font-weight: bold; text-transform: uppercase;">
        Stay up to date about our latest offers!
      </div>
      <div style="flex: 1 1 40%; display: flex; flex-direction: column; gap: 1rem;">
        <input type="email" placeholder="Enter your email" style="padding: 0.75rem 1rem; border-radius: 8px; border: none; outline: none; font-size: 1rem; background-color: #fff; color: #000;" />
        <button style="padding: 0.75rem 1rem; border-radius: 8px; border: none; background-color: #fff; color: #000; font-weight: bold; cursor: pointer; font-size: 1rem;">
          Subscribe to newsletter
        </button>
      </div>
    </section>

    <div class="container is-flex is-justify-content-space-between is-flex-wrap mb-6 footer-main">
      <div class="footer-brand" style="flex: 1 1 25%; margin-bottom: 2rem;">
        <h1 class="has-text-weight-bold is-size-4 mb-2">Shop.co</h1>
        <p style="max-width: 240px; font-size: 0.95rem;">
          A wide range of quality and stylish clothing for every taste and occasion.
        </p>
      </div>
      <div class="is-flex footer-links" style="flex: 1 1 70%; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;"></div>
    </div>

    <div class="container is-flex is-justify-content-space-between is-align-items-center is-flex-wrap py-4 footer-bottom" style="border-top: 1px solid #ddd;">
      <p>© 2025 Shop.co. All rights reserved.</p>
      <div class="is-flex footer-payments" id="payment-icons" style="gap: 2rem; flex-wrap: wrap; margin-right: 4rem;"></div>
    </div>
  `;

  const linksData = [
    { title: 'Company', links: ['About', 'Features', 'Works', 'Career'] },
    { title: 'Help', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
    { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
    { title: 'Resources', links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'YouTube Playlist'] },
  ];

  const footerLinksContainer = footer.querySelector('.footer-links');
  linksData.forEach(section => {
    const block = document.createElement('div');
    block.className = 'footer-link-block';
    block.style.flex = '1';
    block.style.minWidth = '150px';

    const title = document.createElement('h3');
    title.className = 'has-text-weight-bold is-size-6 mb-2';
    title.textContent = section.title;
    block.appendChild(title);

    const ul = document.createElement('ul');
    section.links.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = link;
      a.style.textDecoration = 'none';
      a.style.color = '#4a4a4a';
      a.style.display = 'block';
      a.style.padding = '0.25rem 0';
      li.appendChild(a);
      ul.appendChild(li);
    });

    block.appendChild(ul);
    footerLinksContainer?.appendChild(block);
  });

  const paymentLogos = {
    mastercard: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
    visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    paypal: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    googlepay: 'src/assets/googlepay.png',
    applepay: 'src/assets/applepay.png'
  };

  const paymentContainer = footer.querySelector('#payment-icons');
  Object.entries(paymentLogos).forEach(([name, src]) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = name;
    img.style.height = '24px';
    img.style.objectFit = 'contain';
    paymentContainer?.appendChild(img);
  });

  return footer;
}
