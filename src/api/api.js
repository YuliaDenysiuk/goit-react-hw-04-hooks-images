function fetchImage(name, page) {
    return fetch(`https://pixabay.com/api/?q=${name}&page=${page}&per_page=12&key=23195286-789ed49c86d3fd3c443dc5a81&image_type=photo&orientation=horizontal`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(new Error(`Изображений с именем ${name} не найдено`));
        });
}

const api = {
    fetchImage,
};

export default api;
