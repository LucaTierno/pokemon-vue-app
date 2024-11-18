
//* Función para capitalizar la primera letra de un string
export default function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}