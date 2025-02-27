import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div style={{ marginBottom: '5px' }}>
      <Controller
        name={name}
        render={({ field }) =>(
          <Form.Item label={label}>
            <Input disabled={disabled} {...field} type={type} id={name} />
          </Form.Item>
        ) }
      />
    </div>
  );
};

export default PHInput;
