export const formatarCEP = (str) => {
    var re = /^([\d]{2})\.?([\d]{3})-*([\d]{3})/; // Pode usar ? no lugar do *

    if (re.test(str)) {
        return str.replace(re, "$1$2-$3");
    } else {
        alert("CEP inválido!");
    }
    return "";
}

export const phoneMask = (v) => {

    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");

    if (r.length > 11) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
        r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (v.trim() !== "") {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}
