function submitData(event) {
  event.preventDefault();
  const inputName = document.getElementById("inputName").value;
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPhone = document.getElementById("inputPhone").value;
  const inputSubject = document.getElementById("inputSubject").value;
  const inputText = document.getElementById("inputText").value;

  const objectData = {
    inputName,
    inputEmail,
    inputPhone,
    inputSubject,
    inputText,
  };

  console.log(objectData);

  if (inputName == "") {
    alert("Name harus diisi !!!");
  } else if (inputEmail == "") {
    alert("Email harus diisi !!!");
  } else if (inputPhone == "") {
    alert("Telephone harus diisi !!!");
  } else if (inputSubject == "") {
    alert("Pilih Subject !!!");
  } else if (inputText == "") {
    alert("Text harus diisi");
  }

  const receiverEmail = "nabil.ghaziro27@gmail.com";

  let sendMessage = document.createElement("a");
  sendMessage.href = `mailto:${receiverEmail}?subject=${inputSubject}&body=Halo nama saya ${inputName}. ${inputText} kontak saya ${inputPhone}`;

  sendMessage.click();
}
