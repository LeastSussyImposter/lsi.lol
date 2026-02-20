"use strict";

addEventListener('load', init);

function init() {
    const form = document.forms.namedItem("brb");

    form.addEventListener('input', input);
    form.addEventListener('submit', copyToClipboard);

    input();
}

function input() {
    const form = document.forms.namedItem("brb");
    const channel_name = form.elements.namedItem("channel-name").value.trim();

    if (!channel_name)
        return;

    let params = '';

    if (!form.elements.namedItem("enable-7tv").checked)
        params += "&no-7tv";
    if (!form.elements.namedItem("enable-ffz").checked)
        params += "&no-ffz";
    if (!form.elements.namedItem("enable-bttv").checked)
        params += "&no-bttv";
    if (!form.elements.namedItem("enable-pronouns").checked)
        params += "&no-pronouns";

    const url = new URL('/brb?channel=' + channel_name + params, location).toString();
    const link = document.createElement('a');
    link.href = url;
    link.textContent = url;
    form.elements.namedItem("url").replaceChildren(link);
}

async function copyToClipboard() {
    const form = document.forms.namedItem("brb");
    event.preventDefault();
    form.elements.namedItem("copy").disabled = true;
    try {
        await navigator.clipboard.writeText(form.elements.namedItem("url").textContent);
        setTimeout(() => {
            form.elements.namedItem("copy").disabled = false
        }, 500);
    } catch (e) {
        console.error(e);
        form.elements.namedItem("copy").value = 'Failed to access clipboard';
    }
}