import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
import 'photoswipe/dist/photoswipe.css';

function initPhotoSwipeGallery() {
  const galleryElement = document.querySelector('.gallery__grid');

  if (!galleryElement) return;

  const lightbox = new PhotoSwipeLightbox({
    gallery: galleryElement,
    children: '.gallery__item > a',
    arrowPrevSVG: '<i class="bi bi-chevron-left text-white fs-1"></i>',
    arrowNextSVG: '<i class="bi bi-chevron-right text-white fs-1"></i>',
    closeSVG: '<i class="bi bi-x-lg text-white fs-3"></i>',
    zoomSVG: '<i class="bi bi-zoom-in text-white fs-3"></i>',
    pswpModule: () => import('photoswipe'),
    showHideAnimationType: 'zoom',
    bgOpacity: 0.8
  });

  lightbox.init();
}

document.addEventListener('DOMContentLoaded', initPhotoSwipeGallery);


function initGalleryFilters() {
  const galleryItems = document.querySelectorAll('.gallery__item');
  const yearFilter = document.getElementById('yearFilter');
  const filtersContainer = document.querySelector('.gallery__filters-sidebar');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const galleryCount = document.getElementById('galleryCount');

  if (!galleryItems.length || !yearFilter || !filtersContainer) return;

  function applyFilters() {
    const selectedYear = yearFilter.value;
    const selectedTags = Array.from(filtersContainer.querySelectorAll('.filter-tag:checked')).map(cb => cb.value);

    let visibleCount = 0;

    galleryItems.forEach(item => {
      const { year, tags = '' } = item.dataset;
      const itemTagsArray = tags.split(' ');

      const matchYear = !selectedYear || year === selectedYear;
      const matchTags = selectedTags.length === 0 || selectedTags.some(tag => itemTagsArray.includes(tag));

      const isVisible = matchYear && matchTags;
      item.classList.toggle('d-none', !isVisible);
      
      if (isVisible) visibleCount++;
    });

    if (galleryCount) galleryCount.textContent = visibleCount;
    
    if (clearFiltersBtn) {
      const hasActiveFilters = selectedYear !== '' || selectedTags.length > 0;
      clearFiltersBtn.classList.toggle('d-none', !hasActiveFilters);
    }
  }

  filtersContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('filter-tag') || event.target === yearFilter) {
      applyFilters();
    }
  });


  clearFiltersBtn?.addEventListener('click', () => {
    yearFilter.value = '';
    filtersContainer.querySelectorAll('.filter-tag').forEach(cb => cb.checked = false);
    applyFilters();
  });
}

document.addEventListener('DOMContentLoaded', initGalleryFilters);