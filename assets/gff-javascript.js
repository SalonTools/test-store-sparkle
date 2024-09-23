/** /assets/gff-javascript.js */
(() => {

  function onDomContentLoaded() {
    monitorDeviceSize();
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

  document.addEventListener('DOMContentLoaded', onDomContentLoaded);

})();