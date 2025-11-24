export class LocalStorageService<
	Key extends string,
	Schema extends Record<Key, string>,
> {
	get(field: Key): Schema[Key] | null {
		const value = localStorage.getItem(field);

		if (!value) {
			return null;
		}

		try {
			return JSON.parse(value);
		} catch (e) {
			console.error(
				`Error in local storage service while reading "${field}" field value`,
				e,
			);
			return null;
		}
	}

	set(field: Key, value: Schema[Key]): void {
		try {
			localStorage.setItem(field, JSON.stringify(value));
		} catch (e) {
			console.error(
				`Error in local storage service while setting "${value}" value to the "${field}" field`,
				e,
			);
		}
	}

	remove(field: Key): void {
		localStorage.removeItem(field);
	}
}
