import { LightningElement } from 'lwc';

export default class InputDownload extends LightningElement {
    inputValue = ''; 
    showDownloadButton = false;  
    baseUrl = 'https://YourSalesforceURL.lightning.force.com/sfc/servlet.shepherd/version/download/'; 
    selectedCharacterLimit = ''; 
    showInput = false; // Controls the visibility of the text box

    handleInputChange(event) {
        let input = event.target.value;
        const charLimit = parseInt(this.selectedCharacterLimit);

        if (charLimit) {
            input = input.replace(/\//g, '');
            const regex = new RegExp(`.{1,${charLimit}}`, 'g');
            const splitInput = input.match(regex);
            this.inputValue = splitInput ? splitInput.join('/') : input;
        } else {
            this.inputValue = input;
        }

        this.template.querySelector('lightning-input').value = this.inputValue;
        this.showDownloadButton = this.inputValue.length > 0;
    }

    handleDownload() {
        const downloadUrl = this.baseUrl + this.inputValue;
        console.log(`Download URL: ${downloadUrl}`);

        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.target = '_blank'; 
        downloadLink.click();
    }

    handleCheckboxChange(event) {
        const selectedValue = event.target.value;
        const isChecked = event.target.checked;
        const checkboxes = this.template.querySelectorAll('lightning-input[type="checkbox"]');

        if (isChecked) {
            checkboxes.forEach(checkbox => {
                if (checkbox.value !== selectedValue) {
                    checkbox.disabled = true;
                }
            });
            this.showInput = true; // Show the input box when a checkbox is checked
        } else {
            checkboxes.forEach(checkbox => {
                checkbox.disabled = false;
            });
            this.showInput = false; // Hide the input box when the checkbox is unchecked
        }
        this.selectedCharacterLimit = isChecked ? selectedValue : '';
        console.log(`Selected limit: ${this.selectedCharacterLimit} characters`);
    }
}
