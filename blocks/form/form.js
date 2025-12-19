export default function decorate(block) {
  // 创建表单HTML结构
  block.innerHTML = `
    <form id="contact-form">
      <div class="form-group">
        <label for="name">姓名 *</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="form-group">
        <label for="phone">电话 *</label>
        <input type="tel" id="phone" name="phone" required>
      </div>
      
      <div class="form-group">
        <label for="email">邮箱 *</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" id="consent" name="consent" required>
          <span class="checkmark"></span>
          我同意存储我的个人信息
        </label>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="button primary">提交</button>
      </div>
      
      <div id="form-message" class="form-message" style="display: none;"></div>
    </form>
  `;


  const form = block.querySelector('#contact-form');
  const messageDiv = block.querySelector('#form-message');


  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      consent: formData.get('consent') === 'on',
      timestamp: new Date().toISOString()
    };

    try {

      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.textContent = '提交中...';
      submitButton.disabled = true;

    
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      
      const isSuccess = Math.random() < 0.7;
      
      if (isSuccess) {
        
        showMessage('表单提交成功！感谢您的信息。', 'success');
        form.reset();
      } else {
        
        const errors = [
          '网络连接超时，请稍后重试。',
          '服务器繁忙，请稍后再试。',
          '提交频率过高，请稍后重试。'
        ];
        const randomError = errors[Math.floor(Math.random() * errors.length)];
        showMessage(randomError, 'error');
      }
    } catch (error) {
      
      showMessage('网络错误，请检查连接后重试。', 'error');
    } finally {
      
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.textContent = '提交';
      submitButton.disabled = false;
    }
  });

 
  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
  
    if (type === 'success') {
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 3000);
    }
  }
}