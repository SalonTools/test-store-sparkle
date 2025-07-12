/** /assets/gff-javascript.js */
(() => {

  function onDomContentLoaded() {
    monitorDeviceSize();
    removeAutoComplete();
  }

  function onDeviceSizeChange({matches = false}) {
    document.documentElement.classList.toggle('gff-desktop', !matches);
    document.documentElement.classList.toggle('gff-mobile', matches);
  }

  function monitorDeviceSize() {
    const result = matchMedia('(max-width: 768px)');
    onDeviceSizeChange(result);

    result.addEventListener('change', onDeviceSizeChange);
  }

  function removeAutoComplete() {
    const container = document.querySelector('.klaviyo-form-SFj2dB');
    const observer = new MutationObserver(() => {
      const form = container.querySelector('form');
      if (form) {
        form.setAttribute('autocomplete', 'off');
        Array.from(form.elements, input => {
          input.autocomplete && (input.autocomplete = 'off');
        });
        observer.disconnect();
      }
    });
    location.search.includes('autocomplete=off') && container && observer.observe(container, { childList: true, subtree: true });
  }

  document.addEventListener('DOMContentLoaded', onDomContentLoaded);

})();