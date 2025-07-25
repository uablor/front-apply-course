// composables/useEmailVerification.ts
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

type VerificationStatus = 'verifying' | 'success' | 'error' | 'expired';

export function useEmailVerification() {
  const route = useRoute();
  const router = useRouter();

  const status = ref<VerificationStatus>('verifying');
  const errorMessage = ref('');
  const isRequesting = ref(false);
  const isSending = ref(false);
  const showEmailModal = ref(false);
  const emailForResend = ref('');

  const verifyEmail = async (token: string) => {
    try {
      status.value = 'verifying';
      await new Promise((r) => setTimeout(r, 2000));

      const response = await fetch('/api/email/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          status.value = 'success';
          message.success('ຢືນຢັນອີເມວສຳເລັດ!');
        } else {
          throw new Error(data.message || 'Verification failed');
        }
      } else if (response.status === 410) {
        status.value = 'expired';
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network error');
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      if (error.message.includes('expired') || error.message.includes('invalid')) {
        status.value = 'expired';
      } else {
        status.value = 'error';
        errorMessage.value = error.message || 'ການຢືນຢັນລົ້ມເຫຼວ';
      }
    }
  };

  const requestNewLink = () => {
    emailForResend.value = route.query.email as string || '';
    showEmailModal.value = true;
  };

  const sendNewVerificationLink = async () => {
    if (!emailForResend.value) {
      return message.error('ກະລຸນາປ້ອນອີເມວ');
    }

    if (!isValidEmail(emailForResend.value)) {
      return message.error('ທີ່ຢູ່ອີເມວບໍ່ຖືກຕ້ອງ');
    }

    try {
      isSending.value = true;

      const response = await fetch('/api/email/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailForResend.value })
      });

      if (response.ok) {
        message.success('ສົ່ງລິ້ງຢືນຢັນໃໝ່ແລ້ວ');
        showEmailModal.value = false;
      } else {
        throw new Error('Failed to send verification link');
      }
    } catch (error: any) {
      console.error('Resend error:', error);
      message.error('ສົ່ງລິ້ງໃໝ່ລົ້ມເຫຼວ');
    } finally {
      isSending.value = false;
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return {
    status,
    errorMessage,
    isRequesting,
    isSending,
    showEmailModal,
    emailForResend,
    verifyEmail,
    requestNewLink,
    sendNewVerificationLink,
    goToLogin
  };
}
