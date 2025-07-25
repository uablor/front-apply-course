<template>
  <div class="verification-container">
    <div class="verification-card">
      <!-- Header Section -->
      <div class="verification-header">
        <div class="icon-container">
          <MailOutlined class="mail-icon" />
        </div>
        <h2 class="title">ຢືນຢັນທີ່ຢູ່ອີເມວ</h2>
        <p class="subtitle">
          ກະລຸນາກວດສອບອີເມວຂອງທ່ານ ແລະ ປ້ອນລະຫັດຢືນຢັນ
        </p>
      </div>

      <!-- Email Display -->
      <div class="email-display">
        <a-alert 
          :message="`ລະຫັດຢືນຢັນໄດ້ຖືກສົ່ງໄປທີ່: ${userEmail}`" 
          type="info" 
          show-icon 
          class="email-alert"
        />
      </div>

      <!-- Verification Form -->
      <a-form 
        ref="formRef"
        :model="form" 
        :rules="rules" 
        layout="vertical"
        @finish="handleVerify"
        class="verification-form"
      >
        <a-form-item 
          name="verificationCode" 
          label="ລະຫັດຢືນຢັນ (6 ຫຼັກ)"
          class="code-input-item"
        >
          <a-input
            v-model:value="form.verificationCode"
            placeholder="000000"
            size="large"
            maxlength="6"
            class="code-input"
            @input="handleCodeInput"
            :disabled="isVerifying"
          />
        </a-form-item>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <a-button 
            type="primary" 
            html-type="submit"
            size="large"
            :loading="isVerifying"
            :disabled="form.verificationCode.length !== 6"
            block
            class="verify-button"
          >
            <template #icon>
              <CheckCircleOutlined />
            </template>
            ຢືນຢັນ
          </a-button>
        </div>
      </a-form>

      <!-- Resend Section -->
      <div class="resend-section">
        <p class="resend-text">ບໍ່ໄດ້ຮັບລະຫັດ?</p>
        <div class="resend-actions">
          <a-button 
            type="link" 
            :disabled="countdown > 0 || isResending"
            :loading="isResending"
            @click="resendCode"
            class="resend-button"
          >
            <template v-if="countdown > 0">
              ສົ່ງຄືນໃໝ່ໃນ {{ countdown }} ວິນາທີ
            </template>
            <template v-else>
              <RedoOutlined />
              ສົ່ງລະຫັດຄືນໃໝ່
            </template>
          </a-button>
        </div>
      </div>

      <!-- Help Section -->
      <div class="help-section">
        <a-collapse ghost>
          <a-collapse-panel key="help" header="ບໍ່ພົບອີເມວ?">
            <div class="help-content">
              <p>• ກວດສອບໃນໂຟນເດີ Spam ຫຼື Junk</p>
              <p>• ຕ້ອງການປ່ຽນທີ່ຢູ່ອີເມວ? 
                <a-button type="link" size="small" @click="changeEmail">
                  ປ່ຽນອີເມວ
                </a-button>
              </p>
              <p>• ຕິດຕໍ່ສະໜັບສະໜູນ: support@yourapp.com</p>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>

    <!-- Change Email Modal -->
    <a-modal
      v-model:open="showChangeEmailModal"
      title="ປ່ຽນທີ່ຢູ່ອີເມວ"
      @ok="handleChangeEmail"
      :confirm-loading="isChangingEmail"
      ok-text="ອັບເດດ"
      cancel-text="ຍົກເລີກ"
    >
      <a-form layout="vertical">
        <a-form-item label="ທີ່ຢູ່ອີເມວໃໝ່">
          <a-input 
            v-model:value="newEmail" 
            type="email"
            placeholder="example@email.com"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import {
  MailOutlined,
  CheckCircleOutlined,
  RedoOutlined
} from '@ant-design/icons-vue';
import { useVerification } from '../../composables/useAuth/useVerification';

const props = defineProps<{
  userEmail: string;
  onVerificationSuccess?: () => void;
  onChangeEmail?: (newEmail: string) => Promise<void>;
}>();

const {
  formRef,
  form,
  rules,
  isVerifying,
  isResending,
  isChangingEmail,
  countdown,
  showChangeEmailModal,
  newEmail,
  handleCodeInput,
  handleVerify,
  resendCode,
  changeEmail,
  handleChangeEmail
} = useVerification(props.userEmail, props.onVerificationSuccess, props.onChangeEmail);
</script>

<style lang="scss" scoped>
.verification-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.verification-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 480px;
}

.verification-header {
  text-align: center;
  margin-bottom: 32px;
  
  .icon-container {
    margin-bottom: 16px;
    
    .mail-icon {
      font-size: 48px;
      color: #1890ff;
      background: rgba(24, 144, 255, 0.1);
      padding: 16px;
      border-radius: 50%;
    }
  }
  
  .title {
    font-size: 24px;
    font-weight: 600;
    color: #262626;
    margin: 0 0 8px 0;
  }
  
  .subtitle {
    font-size: 14px;
    color: #8c8c8c;
    margin: 0;
    line-height: 1.5;
  }
}

.email-display {
  margin-bottom: 24px;
  
  .email-alert {
    border-radius: 8px;
  }
}

.verification-form {
  .code-input-item {
    margin-bottom: 24px;
    
    .code-input {
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 4px;
      border-radius: 8px;
    }
  }
}

.action-buttons {
  margin-bottom: 24px;
  
  .verify-button {
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
  }
}

.resend-section {
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  margin-bottom: 16px;
  
  .resend-text {
    font-size: 14px;
    color: #8c8c8c;
    margin: 0 0 8px 0;
  }
  
  .resend-button {
    font-size: 14px;
    padding: 4px 8px;
  }
}

.help-section {
  .help-content {
    font-size: 14px;
    color: #595959;
    line-height: 1.6;
    
    p {
      margin: 8px 0;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .verification-container {
    padding: 16px;
  }
  
  .verification-card {
    padding: 24px;
  }
  
  .verification-header {
    .title {
      font-size: 20px;
    }
    
    .icon-container .mail-icon {
      font-size: 40px;
      padding: 12px;
    }
  }
}

// Dark mode support (optional)
@media (prefers-color-scheme: dark) {
  .verification-container {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  }
  
  .verification-card {
    background: #1f1f1f;
    color: #ffffff;
  }
}
</style>