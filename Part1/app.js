"use strict";
// PROG2005 Assignment 2 - Part 1
let inventory = JSON.parse(localStorage.getItem('inventoryData') || '[]');
// 1. 工具函数
/** 清空表单输入框 */
function clearForm() {
    const formElementIds = ["itemId", "itemName", "quantity", "price", "supplier", "comment"];
    formElementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element)
            element.value = "";
    });
}
/** 验证输入合法性 */
function validateInputs(id, name, qty, price, supplier) {
    if (!id || !name || isNaN(qty) || qty < 0 || isNaN(price) || price < 0 || !supplier) {
        showMessage("Error: Please fill all required fields correctly.");
        return false;
    }
    return true;
}
/** 显示提示消息 */
function showMessage(msg) {
    const outputEl = document.getElementById("output");
    if (!outputEl)
        return;
    outputEl.innerHTML = `<strong style="color: #dc2626;">${msg}</strong>`;
    // 3秒后自动清空提示
    setTimeout(() => {
        if (outputEl.innerHTML.includes(msg))
            outputEl.innerHTML = "";
    }, 3000);
}
// 2. 业务逻辑函数
function addOrUpdateItem() {
    // 获取表单元素并做类型断言
    const itemIdEl = document.getElementById("itemId");
    const itemNameEl = document.getElementById("itemName");
    const categoryEl = document.getElementById("category");
    const quantityEl = document.getElementById("quantity");
    const priceEl = document.getElementById("price");
    const supplierEl = document.getElementById("supplier");
    const stockStatusEl = document.getElementById("stockStatus");
    const popularItemEl = document.getElementById("popularItem");
    const commentEl = document.getElementById("comment");
    // 检查元素是否存在
    const missingElements = [];
    if (!itemIdEl)
        missingElements.push("Item ID");
    if (!itemNameEl)
        missingElements.push("Item Name");
    if (!categoryEl)
        missingElements.push("Category");
    if (!quantityEl)
        missingElements.push("Quantity");
    if (!priceEl)
        missingElements.push("Price");
    if (!supplierEl)
        missingElements.push("Supplier");
    if (!stockStatusEl)
        missingElements.push("Stock Status");
    if (!popularItemEl)
        missingElements.push("Popular Item");
    if (!commentEl)
        missingElements.push("Comment");
    if (missingElements.length > 0) {
        showMessage(`Error: Missing form elements - ${missingElements.join(", ")}`);
        return;
    }
    // 获取输入值
    const itemId = itemIdEl.value.trim();
    const itemName = itemNameEl.value.trim();
    const category = categoryEl.value;
    const quantity = Number(quantityEl.value);
    const price = Number(priceEl.value);
    const supplier = supplierEl.value.trim();
    const stockStatus = stockStatusEl.value;
    const popularItem = popularItemEl.value;
    const comment = commentEl.value.trim();
    // 验证输入
    if (!validateInputs(itemId, itemName, quantity, price, supplier))
        return;
    // 重复ID检查
    const idExists = inventory.some(item => item.itemId === itemId);
    if (idExists) {
        showMessage("Error: Item ID already exists!");
        return;
    }
    // 新增/更新逻辑
    const nameIndex = inventory.findIndex(item => item.itemName.toLowerCase() === itemName.toLowerCase());
    if (nameIndex !== -1) {
        inventory[nameIndex] = { itemId, itemName, category, quantity, price, supplier, stockStatus, popularItem, comment };
        showMessage("Success: Item updated!");
    }
    else {
        inventory.push({ itemId, itemName, category, quantity, price, supplier, stockStatus, popularItem, comment });
        showMessage("Success: Item added!");
    }
    // 保存到本地存储
    localStorage.setItem('inventoryData', JSON.stringify(inventory));
    clearForm();
    showAllItems();
}
/** 显示所有物品 */
function showAllItems() {
    const outputEl = document.getElementById("output");
    if (!outputEl)
        return;
    if (inventory.length === 0) {
        outputEl.innerHTML = "<strong>No items in inventory yet.</strong>";
        return;
    }
    let html = "<h3>All Inventory Items</h3><ul style='list-style: none; padding: 0;'>";
    inventory.forEach(item => {
        html += `
        <li style="margin: 8px 0; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px;">
            <div>ID: ${item.itemId} | Name: ${item.itemName} | Category: ${item.category}</div>
            <div>Qty: ${item.quantity} | Price: $${item.price.toFixed(2)} | Supplier: ${item.supplier}</div>
            <div>Stock: ${item.stockStatus} | Popular: ${item.popularItem}</div>
            <div>Comment: ${item.comment || "N/A"}</div>
        </li>
        `;
    });
    html += "</ul>";
    outputEl.innerHTML = html;
}
/** 显示热门物品 */
function showPopularItems() {
    const outputEl = document.getElementById("output");
    if (!outputEl)
        return;
    const popularItems = inventory.filter(item => item.popularItem === "Yes");
    if (popularItems.length === 0) {
        outputEl.innerHTML = "<strong>No popular items found.</strong>";
        return;
    }
    let html = "<h3>Popular Items</h3><ul style='list-style: none; padding: 0;'>";
    popularItems.forEach(item => {
        html += `<li style="margin: 4px 0; padding: 4px;">${item.itemName} | $${item.price.toFixed(2)}</li>`;
    });
    html += "</ul>";
    outputEl.innerHTML = html;
}
function searchItems() {
    const searchInputEl = document.getElementById("searchInput");
    const outputEl = document.getElementById("output");
    if (!searchInputEl || !outputEl)
        return;
    const keyword = searchInputEl.value.trim().toLowerCase();
    if (!keyword) {
        outputEl.innerHTML = "";
        return;
    }
    const results = inventory.filter(item => item.itemName.toLowerCase().includes(keyword));
    if (results.length === 0) {
        outputEl.innerHTML = `<strong>No items match "${keyword}"</strong>`;
        return;
    }
    let html = `<h3>Search Results (${results.length})</h3><ul style='list-style: none; padding: 0;'>`;
    results.forEach(item => {
        html += `<li style="margin: 4px 0; padding: 4px;">${item.itemName} | Qty: ${item.quantity} | Stock: ${item.stockStatus}</li>`;
    });
    html += "</ul>";
    outputEl.innerHTML = html;
}
function deleteItemPrompt() {
    const targetName = prompt("Enter EXACT item name to delete:");
    if (!targetName)
        return;
    const index = inventory.findIndex(item => item.itemName.toLowerCase() === targetName.toLowerCase());
    if (index === -1) {
        showMessage("Error: Item not found!");
        return;
    }
    if (confirm(`Are you sure to delete "${inventory[index].itemName}"?`)) {
        inventory.splice(index, 1);
        localStorage.setItem('inventoryData', JSON.stringify(inventory));
        showMessage("Success: Item deleted!");
        showAllItems();
    }
}
// 3. 页面加载事件
window.addEventListener('DOMContentLoaded', () => {
    // 初始化显示所有物品
    showAllItems();
    // 绑定按钮事件
    const saveBtn = document.querySelector('button[onclick="addOrUpdateItem()"]');
    const showAllBtn = document.querySelector('button[onclick="showAllItems()"]');
    const showPopularBtn = document.querySelector('button[onclick="showPopularItems()"]');
    const deleteBtn = document.querySelector('button[onclick="deleteItemPrompt()"]');
    const searchInput = document.getElementById("searchInput");
    // 安全绑定事件
    if (saveBtn)
        saveBtn.onclick = addOrUpdateItem;
    if (showAllBtn)
        showAllBtn.onclick = showAllItems;
    if (showPopularBtn)
        showPopularBtn.onclick = showPopularItems;
    if (deleteBtn)
        deleteBtn.onclick = deleteItemPrompt;
    if (searchInput)
        searchInput.oninput = searchItems;
});
