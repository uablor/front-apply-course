<template>
  <div class="profile-container">

    <div v-if="useStudentComposable.isLoding_findone.value" class="loading-container">
      <a-spin size="large" />
      <p>Loading student profile...</p>
    </div>


    <div v-else-if="useStudentComposable.error_findone.value" class="error-container">
      <a-result status="error" title="Failed to Load Profile" :sub-title="error">
        <template #extra>
          <a-button type="primary" @click="loadStudentProfile">
            Try Again
          </a-button>
        </template>
      </a-result>
    </div>


    <div v-else-if="!useStudentstore.student" class="not-found-container">
      <a-result status="404" title="Student Not Found"
        sub-title="The student profile you are looking for does not exist.">
        <template #extra>
          <a-button type="primary" @click="$router.push('/student')">
            Back to Students List
          </a-button>
        </template>
      </a-result>
    </div>

    <div v-else class="profile-content">
      <!-- Profile Header Card -->
      <a-card class="profile-header-card">
        <div class="profile-header">
          <a-avatar :size="80" class="profile-avatar"
            :style="{ backgroundColor: student.gender === 'male' ? '#1890ff' : '#eb2f96' }">
            {{ getInitials(student.name, student.surname) }}
          </a-avatar>

          <div class="header-info">
            <h1 class="student-name">{{ student.name }} {{ student.surname }}</h1>
            <p class="student-email">
              <MailOutlined /> {{ student.user?.email }}
            </p>
            <div class="status-info">
              <a-tag :color="student.student_educations?.[0]?.status === 'studying' ? 'green' : 'orange'"
                class="status-tag">
                {{ student.student_educations?.[0]?.status === 'studying' ? 'Currently Studying' : 'Graduated' }}
              </a-tag>
              <a-tag :color="student.gender === 'male' ? 'blue' : 'pink'" class="gender-tag">
                {{ student.gender === 'male' ? 'Male' : 'Female' }}
              </a-tag>
            </div>
          </div>

          <div class="header-actions">
            <a-button type="default" @click="viewMode" :class="{ active: mode === 'view' }">
              <template #icon>
                <EyeOutlined />
              </template>
              View
            </a-button>
            <a-button type="primary" @click="editMode" :class="{ active: mode === 'edit' }">
              <template #icon>
                <EditOutlined />
              </template>
              Edit
            </a-button>
          </div>
        </div>
      </a-card>

      <!-- Profile Details -->
      <div class="profile-details">
        <!-- Personal Information -->
        <a-card class="detail-card" title="Personal Information">
          <template #extra>
            <IdcardOutlined />
          </template>

          <a-form ref="personalFormRef" :model="formData.personal" :rules="personalRules" layout="vertical"
            class="profile-form" :disabled="mode === 'view'">
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="First Name" name="name">
                  <a-input v-model:value="formData.personal.name" placeholder="Enter first name" size="large" />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="Last Name" name="surname">
                  <a-input v-model:value="formData.personal.surname" placeholder="Enter last name" size="large" />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="Birth Date" name="birth_date">
                  <a-date-picker v-model:value="formData.personal.birth_date" style="width: 100%" format="DD/MM/YYYY"
                    size="large" />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="Gender" name="gender">
                  <a-select v-model:value="formData.personal.gender" placeholder="Select gender" size="large">
                    <a-select-option value="male">
                      <UserOutlined /> Male
                    </a-select-option>
                    <a-select-option value="female">
                      <UserOutlined /> Female
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item label="Address" name="address">
                  <a-textarea v-model:value="formData.personal.address" :rows="3" placeholder="Enter full address"
                    size="large" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>

        <!-- Account Information -->
        <a-card class="detail-card" title="Account Information">
          <template #extra>
            <UserOutlined />
          </template>

          <a-form ref="accountFormRef" :model="formData.account" :rules="accountRules" layout="vertical"
            class="profile-form" :disabled="mode === 'view'">
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="Email Address" name="email">
                  <a-input v-model:value="formData.account.email" placeholder="Enter email address" size="large" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>

        <!-- Education Information -->
        <a-card class="detail-card" title="Education & Career">
          <template #extra>
            <BookOutlined />
          </template>

          <a-form ref="educationFormRef" :model="formData.education" :rules="educationRules" layout="vertical"
            class="profile-form" :disabled="mode === 'view'">
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="Education Level" name="level">
                  <a-input v-model:value="formData.education.level" placeholder="e.g., Bachelor's Degree"
                    size="large" />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="Field of Study" name="field_of_study">
                  <a-input v-model:value="formData.education.field_of_study" placeholder="e.g., Computer Science"
                    size="large" />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="Current Occupation" name="current_occupation">
                  <a-input v-model:value="formData.education.current_occupation" placeholder="Current job or occupation"
                    size="large" />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="Work Experience" name="work_experience">
                  <a-input-number v-model:value="formData.education.work_experience" :min="0" style="width: 100%"
                    placeholder="Years of experience" size="large" addon-after="years" />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="Academic Status" name="status">
                  <a-select v-model:value="formData.education.status" placeholder="Select academic status" size="large">
                    <a-select-option value="studying">
                      <BookOutlined /> Currently Studying
                    </a-select-option>
                    <a-select-option value="graduated">
                      <TrophyOutlined /> Graduated
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
      </div>

      <div v-if="mode === 'edit'" class="action-buttons">
        <a-button size="large" @click="cancelEdit">
          Cancel
        </a-button>
        <a-button type="primary" size="large" @click="saveChanges" :loading="saving">
          Save Changes
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StudentFormService from '../../composables/student.composable';
import { container } from 'tsyringe';
import { useCustomerStore } from '../../stores/student.store';

const useStudentComposable = container.resolve(StudentFormService);
const useStudentstore = useCustomerStore()

</script>

<style lang="scss" scoped>
.profile-container {
  padding: 24px;
  min-height: 100vh;

  .loading-container,
  .error-container,
  .not-found-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    text-align: center;

    p {
      margin-top: 16px;
      font-size: 16px;
      color: #64748b;
    }
  }

  .profile-content {
    max-width: 1200px;
    margin: 0 auto;

    .profile-header-card {
      margin-bottom: 24px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: none;

      .profile-header {
        display: flex;
        align-items: center;
        gap: 24px;

        .profile-avatar {
          flex-shrink: 0;
          font-weight: bold;
          font-size: 24px;
          border: 4px solid #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .header-info {
          flex: 1;
          min-width: 0;

          .student-name {
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: 700;
            color: #1f2937;
          }

          .student-email {
            margin: 0 0 12px 0;
            color: #64748b;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .status-info {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;

            .status-tag,
            .gender-tag {
              font-size: 14px;
              font-weight: 500;
              padding: 4px 12px;
              border-radius: 20px;
            }
          }
        }

        .header-actions {
          display: flex;
          gap: 8px;

          .ant-btn {
            min-width: 100px;
            height: 40px;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;

            &.active {
              transform: scale(0.95);
            }

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
          }
        }
      }
    }

    .profile-details {
      display: grid;
      gap: 24px;

      .detail-card {
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        border: 1px solid #e8e8e8;

        :deep(.ant-card-head) {
          background: linear-gradient(90deg, #fafbfc 0%, #f0f9ff 100%);
          border-bottom: 1px solid #e8e8e8;
          border-radius: 12px 12px 0 0;

          .ant-card-head-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
          }

          .ant-card-extra {
            color: #3b82f6;
            font-size: 18px;
          }
        }

        :deep(.ant-card-body) {
          padding: 24px;
        }

        .profile-form {
          .ant-form-item {
            margin-bottom: 20px;

            .ant-form-item-label>label {
              font-weight: 600;
              color: #374151;
              font-size: 14px;
            }
          }

          .ant-input,
          .ant-select,
          .ant-input-number,
          .ant-picker,
          .ant-input-number-input {
            border-radius: 8px;
            border: 1.5px solid #e5e7eb;
            transition: all 0.3s ease;

            &:focus,
            &:hover:not(:disabled) {
              border-color: #3b82f6;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }

            &:disabled {
              background-color: #f9fafb;
              color: #6b7280;
              cursor: not-allowed;
            }
          }

          .ant-select-selector {
            border-radius: 8px !important;
          }

          .ant-picker {
            width: 100%;
          }
        }
      }
    }

    .action-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

      .ant-btn {
        min-width: 120px;
        height: 44px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 768px) {
  .profile-container {
    padding: 16px;

    .profile-content {
      .profile-header-card {
        .profile-header {
          flex-direction: column;
          text-align: center;
          gap: 16px;

          .header-info {
            text-align: center;

            .student-name {
              font-size: 24px;
            }
          }

          .header-actions {
            width: 100%;
            justify-content: center;

            .ant-btn {
              flex: 1;
              max-width: 120px;
            }
          }
        }
      }

      .profile-details {
        .detail-card {
          :deep(.ant-card-body) {
            padding: 16px;
          }
        }
      }

      .action-buttons {
        flex-direction: column;

        .ant-btn {
          width: 100%;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .profile-header {
    .header-actions {
      flex-direction: column;
      gap: 8px;

      .ant-btn {
        width: 100%;
        max-width: none;
      }
    }
  }
}
</style>